export const CARD_LAYOUT = {
    width: 150,
    height: 230,
    gap: 16,
    overlap: 185,

    get tableauOffset() {
        return this.height - this.overlap;
    }
};