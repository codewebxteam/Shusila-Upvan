import React from 'react';
import { X, ChevronRight } from 'lucide-react';
import { format } from 'date-fns';

const OrderTrackingModal = ({ order, onClose }) => {
    if (!order) return null;

    // Determine current step index
    let currentStepIndex = 0;
    const isCancelled = order.status === 'Cancelled';

    switch (order.status) {
        case 'Placed':
            currentStepIndex = 0;
            break;
        case 'Confirmed':
            currentStepIndex = 1;
            break;
        case 'Shipped':
            currentStepIndex = 2;
            break;
        case 'Delivered':
            currentStepIndex = 3;
            break;
        case 'Cancelled':
            currentStepIndex = -1;
            break;
        default:
            currentStepIndex = 0;
            break;
    }

    // Base date from order, or current date if undefined
    const baseDate = order.date ? new Date(order.date) : new Date();

    const normalSteps = [
        {
            title: 'Order Placed',
            description: format(baseDate, 'EEE, do MMM'),
            isCompleted: currentStepIndex >= 0,
            hasLine: true,
        },
        {
            title: 'Order Confirmed',
            description: currentStepIndex >= 1 ? 'Verified and preparing' : 'Pending',
            isCompleted: currentStepIndex >= 1,
            hasLine: true,
        },
        {
            title: 'Shipped',
            description: currentStepIndex >= 2 ? 'On the way' : 'Pending',
            isCompleted: currentStepIndex >= 2,
            hasLine: true,
        },
        {
            title: 'Delivered',
            description: currentStepIndex >= 3 ? 'Delivered successfully' : 'Pending',
            isCompleted: currentStepIndex >= 3,
            hasLine: false,
        }
    ];

    const cancelledSteps = [
        {
            title: 'Order Placed',
            description: format(baseDate, 'EEE, do MMM'),
            isCompleted: true,
            hasLine: true,
        },
        {
            title: 'Cancelled',
            description: order.cancelReason || 'Your order has been cancelled',
            isCompleted: true,
            isCancelledNode: true,
            hasLine: false,
        }
    ];

    const steps = isCancelled ? cancelledSteps : normalSteps;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 sm:p-0 animate-fade-in" onClick={onClose}>
            {/* Modal Container */}
            <div
                className="bg-[#f1f3f6] w-full max-w-[450px] sm:h-auto h-[90vh] overflow-y-auto sm:rounded-sm shadow-2xl relative flex flex-col font-sans"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Header */}
                <div className="bg-white px-4 py-3 shadow-sm flex items-center gap-3 sticky top-0 z-10 border-b border-gray-200">
                    <button onClick={onClose} className="p-1 hover:bg-gray-100 rounded-full text-gray-700 transition-colors">
                        <X size={24} strokeWidth={2} />
                    </button>
                    <h2 className="text-[17px] font-medium text-gray-900 tracking-wide">Order Details</h2>
                </div>

                <div className="flex-1 p-2 space-y-2">
                    {/* Order ID & Basic Info Card */}
                    <div className="bg-white p-4 shadow-sm">
                        <div className="flex justify-between items-start mb-2">
                            <div>
                                <h3 className="text-sm font-medium text-gray-900 mb-1">Order ID - {order.orderId || order.firebaseId?.slice(-10).toUpperCase() || 'OD1234567890'}</h3>
                                <p className="text-xs text-gray-500 flex items-center gap-1">
                                    Item total: <span className="font-medium text-gray-900">₹{(order.grandTotal || order.amount || 0).toLocaleString('en-IN')}</span>
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Tracking Timeline Card */}
                    <div className="bg-white p-6 shadow-sm">
                        <div className="relative">
                            {steps.map((step, index) => {
                                const isCompleted = step.isCompleted;
                                const isNextCompleted = steps[index + 1]?.isCompleted;
                                const isCancelledNode = step.isCancelledNode;

                                const dotColor = isCancelledNode ? 'bg-[#ff6161]' : (isCompleted ? 'bg-[#26a541]' : 'bg-gray-300');
                                const lineColor = isNextCompleted ? (steps[index + 1]?.isCancelledNode ? 'bg-[#ff6161]' : 'bg-[#26a541]') : 'bg-gray-200';

                                return (
                                    <div key={index} className="flex gap-4 relative min-h-[70px]">

                                        {/* Left Side: Icon & Line */}
                                        <div className="flex flex-col items-center w-6">
                                            {/* Dot */}
                                            <div className="relative mt-1">
                                                <div className={`w-3 h-3 rounded-full z-10 relative ${dotColor}`}></div>
                                                {/* Optional: Add a subtle ping animation to the active step */}
                                                {!isCancelled && isCompleted && !isNextCompleted && step.hasLine && (
                                                    <div className="absolute inset-0 bg-[#26a541] rounded-full animate-ping opacity-20"></div>
                                                )}
                                            </div>

                                            {/* Line */}
                                            {step.hasLine && (
                                                <div className={`w-[2px] h-full absolute top-4 bottom-[-10px] ${lineColor}`}></div>
                                            )}
                                        </div>

                                        {/* Right Side: Content */}
                                        <div className="flex-1 pb-6 -mt-0.5">
                                            <h4 className={`text-[15px] font-medium tracking-wide ${isCancelledNode ? 'text-[#ff6161]' : (isCompleted ? 'text-gray-900' : 'text-gray-400')}`}>
                                                {step.title}
                                            </h4>
                                            <p className={`text-[13px] mt-1 tracking-wide ${isCompleted ? 'text-gray-600' : 'text-gray-400'}`}>
                                                {step.description}
                                            </p>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    {/* Shipping Address Card */}
                    <div className="bg-white p-4 shadow-sm">
                        <h4 className="text-[15px] font-medium text-gray-900 mb-2">Shipping Details</h4>
                        <div className="text-[13px] text-gray-700 leading-relaxed">
                            <p className="font-medium text-gray-900 mb-1">{order.shippingAddress?.fullName || order.address?.fullName || order.customer || 'Customer Name'}</p>
                            {order.shippingAddress || order.address ? (
                                <>
                                    <p>{order.shippingAddress?.street || order.address?.street}</p>
                                    <p>{order.shippingAddress?.city || order.address?.city}, {order.shippingAddress?.state || order.address?.state} - <span className="font-medium">{order.shippingAddress?.pincode || order.address?.pincode}</span></p>
                                    <p className="mt-2 font-medium">Phone number: {order.shippingAddress?.phone || order.address?.mobile}</p>
                                </>
                            ) : (
                                <p className="text-gray-500 italic">Address details unavailable.</p>
                            )}
                        </div>
                    </div>
                </div>

                {/* Bottom padding for mobile */}
                <div className="pb-4 bg-white"></div>
            </div>
        </div>
    );
};

export default OrderTrackingModal;
