function PriceSummary({
  regularPrice,
  discount,
  nights,
  total,
  onClear,
  showClear,
}) {
  return (
    <div className="flex items-center justify-between px-8 bg-accent-500 text-primary-800 h-[72px]">
      <div className="flex items-baseline gap-6">
        <p className="flex gap-2 items-baseline">
          {discount > 0 ? (
            <>
              <span className="text-2xl">${regularPrice - discount}</span>
              <span className="line-through font-semibold text-primary-700">
                ${regularPrice}
              </span>
            </>
          ) : (
            <span className="text-2xl">${regularPrice}</span>
          )}
          <span>/night</span>
        </p>
        {nights > 0 && (
          <>
            <p className="bg-accent-600 px-3 py-2 text-2xl">× {nights}</p>
            <p>
              <span className="text-lg font-bold uppercase">Total</span>{" "}
              <span className="text-2xl font-semibold">${total}</span>
            </p>
          </>
        )}
      </div>
      {showClear && (
        <button
          className="border bg-primary-800 text-accent-300 py-2 px-4 text-sm font-semibold hover:bg-primary-700"
          onClick={onClear}
        >
          Clear
        </button>
      )}
    </div>
  );
}
export default PriceSummary;
