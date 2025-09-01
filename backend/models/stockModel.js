import mongoose from 'mongoose';
import User from './userModel.js';

const stockSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    symbol: {
        type: String,
        enum: ['BTCUSD', 'EURUSD'],
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    lotSize: {
        type: Number,
        required: true,
    },
    takeProfit: {
        type: Number,
        required: true,
    },
    stopLoss: {
        type: Number,
        required: true,
    },
    tradeType: {
        type: String,
        enum: ['buy', 'sell'],
        required: true,
    },
    status: {
        type: String,
        enum: ['open', 'closed'],
        default: 'open',
    },
    balanceAfter: {
        type: Number,
        default: 0,
    },
    exitPrice: {
        type: Number,
    },
    pnl: {
        type: Number,
        default: 0
    },
    result: {
        type: String,
        enum: ['profit', 'loss', 'breakeven'],
    },
    closeReason: {
        type: String,
        enum: ['TP Hit', 'SL Hit', 'manual'],
    },
}, { timestamps: true });

const Stock = mongoose.model('Stock', stockSchema);
export default Stock;