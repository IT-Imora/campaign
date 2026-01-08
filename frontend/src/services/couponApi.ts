import api from "./api";

export const couponApi = {
    check:(no_rangka:string, no_telepon:number) => {
        return api.get(`after_sales/coupons/check`, {
            params: {
                no_rangka,
                no_telepon
            }
        })
    }
}