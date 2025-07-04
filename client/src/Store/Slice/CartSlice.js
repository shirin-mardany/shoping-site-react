import { createSlice } from "@reduxjs/toolkit";
// =======================================================================
const initialState = {
  items: [],
  totalPrice: 0,
};

const cartSlice = createSlice({
  name: "cartSlice",
  initialState,
  reducers: {
    // اکشن clear برای خالی کردن سبد خرید
    clear(state) {
      state.items = [];
      state.totalPrice = 0;
    },
    // اکشن remove برای حذف یک آیتم از سبد خرید
    remove(state, action) {
      const productId = action.payload; // شناسه محصولی که باید حذف شود
      state.items = state.items.filter((e) => {
        if (e._id == productId) {
          e.cartQuantity = e.cartQuantity - 1;
          state.totalPrice = state.totalPrice - e?.price; // کاهش قیمت کل بر اساس قیمت آیتم
          if (e.cartQuantity == 0) {
            return false;
          }
        }
        return e; // بازگرداندن آیتم‌های باقی‌مانده
      });
    },
    // اکشن add برای اضافه کردن یک آیتم به سبد خرید
    add(state, action) {
      let add = false; // متغیری برای بررسی اینکه آیا آیتم جدید است یا خیر
      const product = action.payload; // محصولی که باید اضافه شود
      state.totalPrice = state.totalPrice + product?.price; // افزایش قیمت کل بر اساس قیمت محصول
      state.items = state.items?.map((e) => {
        // بررسی اینکه آیا محصول قبلاً در سبد وجود دارد
        if (e._id == product._id) {
          e.cartQuantity = e.cartQuantity + 1; // افزایش تعداد آیتم در سبد
          add = true; // تنظیم متغیر به true برای نشان دادن اینکه آیتم قبلاً وجود داشته است
        }
        return e;
      });
      if (!add) {
        // اگر آیتم جدید بود
        state.items.push({ ...product, cartQuantity: 1 }); // اضافه کردن آیتم به سبد با مقدار اولیه 1
      }
    },
  },
});

export const { add, remove, clear } = cartSlice.actions;

export default cartSlice.reducer;
