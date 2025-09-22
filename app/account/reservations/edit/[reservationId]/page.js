import SubmitButton from "@/app/_components/SubmitButton";
import { updateBooking } from "@/app/_lib/actions";
import { getBooking, getCabin } from "@/app/_lib/data-services";

export default async function Page({ params }) {
  const { reservationId } = await params;

  const { numGuests, observations, cabinId } = await getBooking(reservationId);

  const updateBookingWithId = updateBooking.bind(null, reservationId);

  const { maxCapacity } = await getCabin(cabinId);

  return (
    <div>
      <h2 className="font-semibold text-xl sm:text-2xl text-accent-400 mb-4 sm:mb-7">
        Edit Reservation #{reservationId}
      </h2>

      <form
        action={updateBookingWithId}
        className="bg-primary-900 py-6 sm:py-8 px-4 sm:px-8 lg:px-12 text-sm sm:text-base lg:text-lg flex gap-4 sm:gap-6 flex-col rounded-lg sm:rounded-none"
      >
        <div className="space-y-2">
          <label htmlFor="numGuests" className="block font-medium">
            How many guests?
          </label>
          <select
            name="numGuests"
            defaultValue={numGuests}
            id="numGuests"
            className="px-3 sm:px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm text-sm sm:text-base"
            required
          >
            <option value="" key="">
              Select number of guests...
            </option>
            {Array.from({ length: maxCapacity }, (_, i) => i + 1).map((x) => (
              <option value={x} key={x}>
                {x} {x === 1 ? "guest" : "guests"}
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-2">
          <label htmlFor="observations" className="block font-medium">
            Anything we should know about your stay?
          </label>
          <textarea
            name="observations"
            defaultValue={observations || ""}
            rows={4}
            className="px-3 sm:px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm resize-vertical min-h-[100px] text-sm sm:text-base"
          />
        </div>

        <div className="flex flex-col sm:flex-row sm:justify-end items-center gap-4 sm:gap-6 pt-2">
          <SubmitButton pendingLabel="Updating...">
            Update Reservation
          </SubmitButton>
        </div>
      </form>
    </div>
  );
}
