import mongoose from 'mongoose';
import User from './userModel.js';

const userReportSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    totalTrades: {
        type: Number,
        default: 0
    },
    accountValue: {
        type: Number,
        default: 1000000 // Default starting account value
    },

    realizedPnL: {
        type: Number,
        default: 0
    },
    totalProfit: {
        type: Number,
        default: 0
    },
    totalLoss: {
        type: Number,
        default: 0,
    },
    avgReaturnPerWeek: {
        type: Number,
        default: 0 // in percentage
    },
    avgHoldingPeriod: {
        type: Number,
        default: 0 // in days
    }
}, { timestamps: true });

const UserReport = mongoose.model('UserReport', userReportSchema);
export default UserReport;