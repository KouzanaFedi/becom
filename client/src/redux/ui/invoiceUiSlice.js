import { createSlice } from "@reduxjs/toolkit";

const invoiceUiSlice = createSlice({
    name: 'invoiceUI',
    initialState: {
        invoiceScale: 1,
        maxHeight: 420,
        itemsHeights: 0,
        breakIndexes: [],
        activeTab: null,
        additionalTab: null,
        additionalTabData: null
    },
    reducers: {
        SET_INVOICE_SCALE: (state, action) =>
        {
            state.invoiceScale = action.payload.invoiceScale;
        },
        ADD_ITEM_HEIGHT: (state, action) =>
        {
            const { height, index } = action.payload;
            const scaledHeight = height * (1 / state.invoiceScale);
            state.itemsHeights += scaledHeight;
            if (state.itemsHeights > state.maxHeight) {
                state.itemsHeights = scaledHeight;
                state.breakIndexes.push(index);
            }
        },
        SET_INVOICE_ACTIVE_TAB: (state, action) =>
        {
            state.activeTab = action.payload.tabType;
        },
        SET_INVOICE_ADDITIONAL_TAB: (state, action) =>
        {
            const { additionalTab, data } = action.payload;
            state.additionalTab = additionalTab;
            state.additionalTabData = data;
        }
    }
});

export default invoiceUiSlice.reducer;

export const { SET_INVOICE_SCALE, ADD_ITEM_HEIGHT, SET_INVOICE_ACTIVE_TAB, SET_INVOICE_ADDITIONAL_TAB } = invoiceUiSlice.actions;

export const invoiceUIData = (state) => state.invoiceUI;
export const invoiceScale = (state) => state.invoiceUI.invoiceScale;
export const invoiceAdditionalTabData = (state) => state.invoiceUI.additionalTabData;


