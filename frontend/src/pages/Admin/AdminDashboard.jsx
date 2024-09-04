import React, { useEffect, useState } from 'react';
import { useGetTotalOrdersQuery, useGetTotalSalesByDateQuery, useGetTotalSalesQuery } from '../../redux/api/orderApiSlice';
import { useGetUsersQuery } from '../../redux/api/userApiSlice';
import AdminMenu from './AdminMenu';
import Loader from '../../components/Loader';
import Chart from 'react-apexcharts';
import OrderList from './OrderList';

const StatCard = ({ title, value, isLoading }) => (
    <div className='w-[20rem] rounded-lg bg-black p-5 mt-5'>
        <div className='font-bold rounded-full bg-pink-500 p-3 w-[3rem] text-center'>
            $
        </div>
        <p className='mt-5'>{title}</p>
        <h1 className='text-xl font-bold'>
            {isLoading ? <Loader /> : value}
        </h1>
    </div>
);

const AdminDashboard = () => {
    const { data: sales, isLoading: salesLoading } = useGetTotalSalesQuery();
    const { data: customers, isLoading: customersLoading } = useGetUsersQuery();
    const { data: orders, isLoading: ordersLoading } = useGetTotalOrdersQuery();
    const { data: salesDetails } = useGetTotalSalesByDateQuery();
    
    const [state, setState] = useState({
        options: {
            chart: {
                type: "line"
            },
            tooltip: {
                theme: "dark"
            },
            colors: ["#00E396"],
            stroke: {
                curve: "smooth"
            },
            title: {
                text: "Sales Trend",
                align: "left"
            },
            grid: {
                borderColor: "#ccc"
            },
            markers: {
                size: 1
            },
            xaxis: {
                categories: [],
                title: {
                    text: "Date"
                },
            },
            yaxis: {
                title: {
                    text: "Sales"
                },
                min: 0,
            },
            legend: {
                position: "top",
                horizontalAlign: 'right',
                floating: true,
                offsetY: -25,
                offsetX: -5,
            }
        },
        series: [{ name: "Sales", data: [] }]
    });

    useEffect(() => {
        if (!Array.isArray(salesDetails)) return; // Ensure salesDetails is an array
        
        const formattedSalesDate = salesDetails.map(item => ({
            x: item._id,
            y: item.totalSales
        }));
        
        setState(prevState => ({
            ...prevState,
            options: {
                ...prevState.options,
                xaxis: {
                    categories: formattedSalesDate.map(item => item.x)
                }
            },
            series: [{ name: "Sales", data: formattedSalesDate.map(item => item.y) }]
        }));
    }, [salesDetails]);

    return (
        <>
            <AdminMenu />
            <section className='xl:ml-[4rem] md:[0rem]'>
                <div className='w-[80%] justify-around flex flex-wrap'>
                    <StatCard title="Sales" value={`$${sales?.totalSales?.toFixed(2)}`} isLoading={salesLoading} />
                    <StatCard title="Customers" value={customers?.length} isLoading={customersLoading} />
                    <StatCard title="All Orders" value={orders?.totalOrders} isLoading={ordersLoading} />
                </div>

                <div className='ml-[10rem] mt-[4rem]'>
                    <Chart options={state.options} series={state.series} width="70%" type='bar' />
                </div>

                <div className='mt-[4rem]'>
                    <OrderList />
                </div>
            </section>
        </>
    );
}

export default AdminDashboard;
