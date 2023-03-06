import { create } from "zustand";

const CartStore = create(set => ({
  listCart: 0,
  setListCart: (listCart) => set({listCart: listCart}),
  count: 5,
  addCount: (pr) => set(state => ({ count: pr })),
}));

export default CartStore;