import { PencilSquareIcon } from "@heroicons/react/24/solid";
import { format, formatDistance, isPast, isToday, parseISO } from "date-fns";
import DeleteReservation from "./DeleteReservation";
import Image from "next/image";
import Link from "next/link";

export const formatDistanceFromNow = (dateStr) =>
  formatDistance(parseISO(dateStr), new Date(), {
    addSuffix: true,
  }).replace("about ", "");

function ReservationCard({ booking, onDelete }) {
  const {
    id,
    guestId,
    startDate,
    endDate,
    numNights,
    totalPrice,
    numGuests,
    status,
    created_at,
    cabins: { name, image },
  } = booking;

  return (
    <div className="flex flex-col sm:flex-row border border-primary-800 overflow-hidden">
      <div className="relative h-48 sm:h-32 sm:w-32 flex-shrink-0">
        <Image
          fill
          src={image}
          alt={`Cabin ${name}`}
          className="object-cover border-b sm:border-b-0 sm:border-r border-primary-800"
        />
      </div>

      <div className="flex-grow px-4 sm:px-6 py-3 flex flex-col">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-0">
          <h3 className="text-lg sm:text-xl font-semibold">
            {numNights} nights in Cabin {name}
          </h3>
          {isPast(new Date(startDate)) ? (
            <span className="bg-yellow-800 text-yellow-200 h-7 px-3 uppercase text-xs font-bold flex items-center rounded-sm w-fit">
              past
            </span>
          ) : (
            <span className="bg-green-800 text-green-200 h-7 px-3 uppercase text-xs font-bold flex items-center rounded-sm w-fit">
              upcoming
            </span>
          )}
        </div>

        <p className="text-sm sm:text-lg text-primary-300 mt-1">
          {format(new Date(startDate), "EEE, MMM dd yyyy")} (
          {isToday(new Date(startDate))
            ? "Today"
            : formatDistanceFromNow(startDate)}
          ) &mdash; {format(new Date(endDate), "EEE, MMM dd yyyy")}
        </p>

        {/* Price and guest info */}
        <div className="flex flex-col sm:flex-row sm:gap-5 mt-auto pt-2 sm:items-baseline">
          <div className="flex gap-3 items-baseline">
            <p className="text-lg sm:text-xl font-semibold text-accent-400">
              ${totalPrice}
            </p>
            <p className="text-primary-300">&bull;</p>
            <p className="text-sm sm:text-lg text-primary-300">
              {numGuests} guest{numGuests > 1 && "s"}
            </p>
          </div>
          <p className="text-xs sm:text-sm text-primary-400 mt-1 sm:mt-0 sm:ml-auto">
            Booked {format(new Date(created_at), "EEE, MMM dd yyyy, p")}
          </p>
        </div>
      </div>

      <div className="flex sm:flex-col border-t sm:border-t-0 sm:border-l border-primary-800 sm:w-[100px]">
        {!isPast(startDate) ? (
          <>
            <Link
              href={`/account/reservations/edit/${id}`}
              className="group flex items-center justify-center sm:justify-start gap-2 uppercase text-xs font-bold text-primary-300 border-r sm:border-r-0 sm:border-b border-primary-800 flex-grow px-3 py-2 sm:py-0 hover:bg-accent-600 transition-colors hover:text-primary-900"
            >
              <PencilSquareIcon className="h-4 sm:h-5 w-4 sm:w-5 text-primary-600 group-hover:text-primary-800 transition-colors" />
              <span className="mt-1 hidden sm:inline">Edit</span>
              <span className="mt-1 sm:hidden">Edit</span>
            </Link>
            <DeleteReservation bookingId={id} onDelete={onDelete} />
          </>
        ) : null}
      </div>
    </div>
  );
}
export default ReservationCard;
