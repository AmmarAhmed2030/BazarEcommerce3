import React from 'react';
import SmallCard from './SmallCard';
import { CheckCheck, Loader2, RefreshCcw, ShoppingCart } from 'lucide-react';

export default function SmallCards({ orders }) {
  const ordersCount = orders.length.toString().padStart(2, '0');
  const pendingOrders = orders.filter((item) => item.orderStatus === 'PENDING');
  const pendingOrdersCount = pendingOrders.length.toString().padStart(2, '0');
  const processingOrders = orders.filter(
    (item) => item.orderStatus === 'PROCESSING',
  );
  const processingOrdersCount = processingOrders.length
    .toString()
    .padStart(2, '0');
  const deliveredOrders = orders.filter(
    (item) => item.orderStatus === 'DELIVERED',
  );
  const deliveredOrdersCount = deliveredOrders.length
    .toString()
    .padStart(2, '0');
  const orderStatus = [
    {
      title: 'Total Order',
      number: ordersCount,
      iconBg: 'bg-green-600',
      icon: ShoppingCart,
    },
    {
      title: 'Orders Pending',
      number: pendingOrdersCount,
      iconBg: 'bg-blue-600',
      icon: Loader2,
    },
    {
      title: 'Orders Processing',
      number: processingOrdersCount,
      iconBg: 'bg-orange-600',
      icon: RefreshCcw,
    },
    {
      title: 'Orders Delivered',
      number: deliveredOrdersCount,
      iconBg: 'bg-purple-600',
      icon: CheckCheck,
    },
  ];
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2  lg:grid-cols-4 gap-4 py-8  lg-px-8 ">
      {orderStatus.map((data, i) => {
        return <SmallCard data={data} key={i} />;
      })}
    </div>
  );
}
