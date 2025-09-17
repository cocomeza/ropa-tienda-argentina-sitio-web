"use client"

import { create } from "zustand"
import { persist } from "zustand/middleware"

export interface CartItem {
  id: string
  name: string
  price: number
  size: string
  color: string
  quantity: number
  image: string
}

interface CartStore {
  items: CartItem[]
  addItem: (item: Omit<CartItem, "quantity">) => void
  removeItem: (id: string, size: string, color: string) => void
  updateQuantity: (id: string, size: string, color: string, quantity: number) => void
  clearCart: () => void
  getTotalItems: () => number
  getTotalPrice: () => number
  getFormattedPrice: (price: number) => string
}

export const useCart = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],

      addItem: (newItem) => {
        set((state) => {
          const existingItem = state.items.find(
            (item) => item.id === newItem.id && item.size === newItem.size && item.color === newItem.color,
          )

          if (existingItem) {
            return {
              items: state.items.map((item) =>
                item.id === newItem.id && item.size === newItem.size && item.color === newItem.color
                  ? { ...item, quantity: item.quantity + 1 }
                  : item,
              ),
            }
          }

          return {
            items: [...state.items, { ...newItem, quantity: 1 }],
          }
        })
      },

      removeItem: (id, size, color) => {
        set((state) => ({
          items: state.items.filter((item) => !(item.id === id && item.size === size && item.color === color)),
        }))
      },

      updateQuantity: (id, size, color, quantity) => {
        if (quantity <= 0) {
          get().removeItem(id, size, color)
          return
        }

        set((state) => ({
          items: state.items.map((item) =>
            item.id === id && item.size === size && item.color === color ? { ...item, quantity } : item,
          ),
        }))
      },

      clearCart: () => set({ items: [] }),

      getTotalItems: () => {
        return get().items.reduce((total, item) => total + item.quantity, 0)
      },

      getTotalPrice: () => {
        return get().items.reduce((total, item) => total + item.price * item.quantity, 0)
      },

      getFormattedPrice: (price) => {
        return new Intl.NumberFormat("es-AR", {
          style: "currency",
          currency: "ARS",
        }).format(price)
      },
    }),
    {
      name: "cart-storage",
    },
  ),
)
