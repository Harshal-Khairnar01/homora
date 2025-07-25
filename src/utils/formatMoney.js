
export default function formatMoney(price){
    let formatter=new Intl.NumberFormat('en-In');
    return formatter.format(price);
}