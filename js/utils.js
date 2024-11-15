// LOCAL STORAGE A EKLEME YAPACAK FONKSIYON
export const saveToLocalStorage = (cart) => {
    try {
        localStorage.setItem('cart', JSON.stringify(cart));
    } catch (error) {
        console.error('Error saving to localStorage', error);
    }
};

// LOCAL STORAGEdan CEKME YAPACAK FONKSIYON
export const getFromLocalStorage = () => {
    try {
        const data = localStorage.getItem('cart');
        return data ? JSON.parse(data) : [];
    } catch (error) {
        console.error('Error reading from localStorage', error);
        return []; // Eğer parse işlemi başarısız olursa boş dizi döndür
    }
}

export const calculateCartTotal = (cart)=>{
    return cart.reduce((sum, item)=>sum+item.price*item.quantity, 0);
}; 

export const updateCartIcon = (cart)=>{
    const i = document.querySelector(".bxs-shopping-bag");
    let totalQuantity = cart.reduce((sum, item)=>{
        return sum+item.quantity;
    },0);
    i.setAttribute("data-quantity", totalQuantity); 

};
/* export const cartItemPriceTotal = (item)=>{
    return item.reduce((sum, item)=>sum+item.price*item.quantity, 0);
} */