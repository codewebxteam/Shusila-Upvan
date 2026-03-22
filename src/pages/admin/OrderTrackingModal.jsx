import React from 'react';
import { ArrowLeft } from 'lucide-react';

const OrderTrackingModal = ({ order, onClose }) => {
    if (!order) return null;

    // Determine current step index
    let currentStepIndex = 0;
    const isCancelled = order.status === 'Cancelled';

    switch (order.status) {
        case 'Placed': currentStepIndex = 0; break;
        case 'Confirmed': currentStepIndex = 1; break;
        case 'Shipped': currentStepIndex = 2; break;
        case 'Delivered': currentStepIndex = 3; break;
        default: currentStepIndex = 0; break;
    }

    const baseDate = order.date ? new Date(order.date) : new Date();

    const normalSteps = [
        { status: 'Placed', date: order.date, completed: currentStepIndex >= 0, desc: 'Your order has been placed successfully.' },
        { status: 'Confirmed', completed: currentStepIndex >= 1, desc: currentStepIndex >= 1 ? 'Verified and preparing' : 'Pending' },
        { status: 'Shipped', completed: currentStepIndex >= 2, desc: currentStepIndex >= 2 ? 'On the way' : 'Pending' },
        { status: 'Delivered', completed: currentStepIndex >= 3, desc: currentStepIndex >= 3 ? 'Delivered successfully' : 'Pending' }
    ];

    const cancelledSteps = [
        { status: 'Placed', date: order.date, completed: true, desc: 'Order placed' },
        { status: 'Cancelled', completed: true, desc: order.cancelReason || 'Your order has been cancelled' }
    ];

    const timelineToRender = order.timeline && order.timeline.length > 0 ? order.timeline : (isCancelled ? cancelledSteps : normalSteps);

    const formatDate = (dateString, includeTime = false) => {
        if (!dateString) return '';
        const date = new Date(dateString);
        const dayName = date.toLocaleDateString('en-US', { weekday: 'short' });
        const day = date.getDate();
        const month = date.toLocaleDateString('en-US', { month: 'short' });
        const year = date.getFullYear().toString().substr(-2);

        let suffix = 'th';
        if (day === 1 || day === 21 || day === 31) suffix = 'st';
        else if (day === 2 || day === 22) suffix = 'nd';
        else if (day === 3 || day === 23) suffix = 'rd';

        let formatted = `${dayName}, ${day}${suffix} ${month} '${year}`;
        if (includeTime) {
            const time = date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true }).toLowerCase();
            formatted = `${dayName}, ${day}${suffix} ${month} '${year} - ${time}`;
        }
        return formatted;
    };

    return (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-0 bg-slate-900/60 backdrop-blur-md" onClick={onClose}>
            <div
                className="bg-white w-full h-full flex flex-col overflow-hidden shadow-2xl"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Header: Simple Back Arrow to mimic single-page dedicated page */}
                <div className="p-5 border-b border-slate-100 flex items-center gap-4 bg-white sticky top-0 z-10">
                    <button
                        onClick={onClose}
                        className="p-1.5 hover:bg-slate-100 rounded-full text-slate-700 transition-colors"
                    >
                        <ArrowLeft size={22} strokeWidth={1.8} />
                    </button>
                    <span className="text-sm font-bold text-slate-400">Track Order</span>
                </div>

                {/* Center Timeline Area */}
                <div className="p-6 md:p-8 flex-1 overflow-y-auto scrollbar-hide bg-white">
                    <div className="relative space-y-6">
                        {timelineToRender.map((step, idx) => {
                            const isCompleted = step.completed || idx === 0;
                            const hasNext = idx < timelineToRender.length - 1;
                            const isNextCompleted = timelineToRender[idx + 1]?.completed;

                            return (
                                <div key={idx} className="relative flex items-start gap-5 pb-7">
                                    {/* Left Column: Dot & Connecting Line */}
                                    <div className="flex flex-col items-center w-3 shrink-0 relative mt-1 h-full">
                                        {hasNext && (
                                            <div className={`w-[2px] h-[calc(100%+16px)] absolute top-3 left-[5px] ${isNextCompleted ? 'bg-green-600' : 'bg-slate-200'}`} />
                                        )}
                                        <div className={`relative z-10 w-2.5 h-2.5 rounded-full shrink-0 border-2 border-white ${isCompleted ? 'bg-green-600' : 'bg-slate-200'}`} />
                                    </div>

                                    {/* Content */}
                                    <div className="flex-1 -mt-0.5">
                                        {/* Header: Status and Date */}
                                        <div className="flex flex-wrap items-baseline gap-2 mb-1">
                                            <h4 className={`text-[15px] font-semibold ${isCompleted ? 'text-slate-900' : 'text-slate-400'}`}>
                                                {step.status}
                                            </h4>
                                            {step.date && (
                                                <span className="text-[12px] text-gray-400 font-medium">
                                                    {formatDate(step.date)}
                                                </span>
                                            )}
                                        </div>

                                        {/* Description with Time below */}
                                        <div className="space-y-1">
                                            <p className={`text-[13.5px] leading-relaxed ${isCompleted ? 'text-slate-700' : 'text-slate-300'}`}>
                                                {step.desc || step.description}
                                            </p>
                                            {step.date && isCompleted && (
                                                <p className="text-[11.5px] text-slate-400 font-medium mt-1">
                                                    {formatDate(step.date, true)}
                                                </p>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>
                <div className="h-4 bg-white shrink-0" />
            </div>
        </div>
    );
};
export default OrderTrackingModal;
