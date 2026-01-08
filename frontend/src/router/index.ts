import { createRouter, createWebHistory } from 'vue-router'
import { useCouponStore } from '@/stores/couponStore'
import { useCampaignStore } from '@/stores/campaignStore'

import HomeView from '../views/HomeView.vue'
import RedirectView from '../views/RedirectView.vue'

import NotFoundView from '../views/errors/NotFoundView.vue'

const routes = [
    {
      path: '/',
      name: 'redirect-home',
      component: RedirectView,
    },
    {
      path: '/:slug',
      name: 'campaign',
      component: HomeView,
    },
    {
      path: '/:slug/coupons/',
      name: 'campaign-coupons',
      component: () => import('../views/coupons/CouponAuthView.vue'),
      meta: {
        title: 'Cek Kupon Kamu',
      }
    },
    {
      path: '/:slug/my-coupons/',
      name: 'campaign-my-coupons',
      component: () => import('../views/coupons/MyCouponsView.vue'),
      meta: {
        requiresCoupon: true,
        title: 'Kupon Saya',
      }
    },
  {
    path: '/:pathMatch(.*)*',
    name: 'not-found',
    component: NotFoundView,
    meta: {
      title: '404 - Page Not Found'
    }
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior(to, from, savedPosition) {
    return savedPosition || { left: 0, top: 0 };
  },
})

router.beforeEach((to, from, next) => {
  const couponStore = useCouponStore();  const campaignStore = useCampaignStore();

  if (to.matched.some(record => record.meta.requiresCoupon)) {
    if (couponStore.count === 0) {
      next({ name: 'campaign-coupons', params: { slug: to.params.slug } });
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router
