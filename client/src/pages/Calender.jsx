import React, { useCallback, useContext, useEffect, useState } from "react";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import format from "date-fns/format";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import getDay from "date-fns/getDay";
import enUS from "date-fns/locale/en-US";
import "react-big-calendar/lib/css/react-big-calendar.css";
import moment from "moment";
import Themecontext from "../hooks/Themecontext";
import AuthContext from "../hooks/AuthContext";
import { getSubscriptionByUser } from "../apis/SubscriptionApi";
import { toast } from "react-toastify";

const locales = {
  "en-US": enUS,
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

const MyCalendar = () => {
  const [events, setEvents] = useState([]);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedEvent, setSelectedEvent] = useState(null);
  const { isDark } = useContext(Themecontext);
  const { id } = useContext(AuthContext);
  const fetchUserActiveSubscription = async () => {
    try {
      const res = await getSubscriptionByUser(id, false);
      const transformed = res.data.map((sub) => ({
        title: sub.name,
        start: new Date(sub.renewalDate),
        end: new Date(sub.renewalDate),
      }));
      setEvents(transformed);
    } catch (err) {
      toast.error(err.response.data.error);
    }
  };
  useEffect(() => {
    fetchUserActiveSubscription();
  }, [id]);

  return (
    <div className="w-full h-[90vh] flex flex-col bg-light-card dark:bg-dark-background">
      <div className="flex-1 overflow-y-auto px-2 sm:px-4 py-2 sm:py-4">
        <div className="min-h-[80vh] sm:min-h-[90vh]">
          <Calendar
            localizer={localizer}
            events={events}
            views={["month"]}
            defaultView="month"
            date={currentDate}
            onNavigate={(date) => setCurrentDate(date)}
            startAccessor="start"
            endAccessor="end"
            popup
            className="font-poppins"
            style={{ height: "100%" }}
            dayPropGetter={(date) => {
              const today = new Date();
              const isToday =
                date.getDate() === today.getDate() &&
                date.getMonth() === today.getMonth() &&
                date.getFullYear() === today.getFullYear();

              const isCurrentMonth = date.getMonth() === currentDate.getMonth();
              const isExtraDay = !isCurrentMonth;

              return {
                style: {
                  backgroundColor: isExtraDay
                    ? isDark
                      ? "#27272a"
                      : "#e5e7eb"
                    : isToday
                    ? "#c3a9fc"
                    : undefined,
                  color: isExtraDay ? "#111827" : undefined,
                  borderRadius: isToday ? "4px" : undefined,
                },
              };
            }}
            eventPropGetter={() => ({
              style: {
                backgroundColor: "#a855f7", // brighter for visibility
                color: "white",
                borderRadius: "4px",
                padding: "2px 4px",
                fontSize: "0.75rem",
                overflow: "hidden",
                whiteSpace: "nowrap",
                textOverflow: "ellipsis",
              },
            })}
            onSelectEvent={(event) => setSelectedEvent(event)}
          />
        </div>
      </div>
      <div
        className={`fixed inset-0 z-50 flex items-center justify-center bg-black/40 transition-all duration-500
    ${
      selectedEvent
        ? "opacity-100 visible"
        : "opacity-0 invisible pointer-events-none"
    }
  `}
  onClick={()=>setSelectedEvent(false)}
      >
        <div
          className={`bg-white dark:bg-dark-card p-6 rounded-xl shadow-xl w-80 text-center transition-transform duration-300 transform
    ${selectedEvent ? "block" : "hidden"}
    
  `}
  onClick={(e)=>e.stopPropagation()}
        >
          {selectedEvent && (
            <>
              <h2 className="text-lg font-semibold text-black dark:text-white mb-2 font-poppins">
                {selectedEvent.title}
              </h2>
              <p className="text-sm text-gray-700 dark:text-gray-300 font-inter">
                {moment(selectedEvent.end).format("MMMM Do, YYYY")}
              </p>
              <button
                onClick={() => setSelectedEvent(null)}
                className="mt-4 bg-light-button dark:bg-dark-button font-poppins text-white px-4 py-2 rounded hover:bg-purple-700"
              >
                Close
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default MyCalendar;
