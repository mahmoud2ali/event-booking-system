import request from "../../utils/request";
import { eventActions } from "../slices/eventSlice";
import { toast } from "react-toastify";

export function getEvents() {
    return async (dispatch) => {
        try {
        dispatch(eventActions.setLoading(true));
        const response = await request.get("/events");
        console.log("response: ", response);
        dispatch(eventActions.setEvents(response.data));
        dispatch(eventActions.setLoading(false));
        } catch (error) {
        console.error("Error fetching events:", error);
        dispatch(eventActions.setLoading(false));
        }
    };
}

export function getSingleEvent(id) {
    return async (dispatch) => {
        try {
        dispatch(eventActions.setLoading(true));
        const response = await request.get(`/events/${id}`);
        console.log("response: ", response);
        dispatch(eventActions.setSingleEvent(response.data));
        dispatch(eventActions.setLoading(false));
        } catch (error) {
        console.error("Error fetching event:", error);
        dispatch(eventActions.setLoading(false));
        }
    };
}

export function createEvent(eventData) {
    return async (dispatch, getState) => {
        try {
        dispatch(eventActions.setLoading(true));
        const token = getState().auth.user.token; 
        await request.post("events/admin/create-event", eventData, {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "multipart/form-data",
            },
        });
        toast.success("Event created successfully!");
        dispatch(eventActions.setIsCreated(true));
        setTimeout(() => {
            dispatch(eventActions.setIsCreated(false));
        }, 3000);
        dispatch(eventActions.setLoading(false));
        } catch (error) {
        // console.error("Error creating event:", error);
        toast.error(error.response.data.message);
        dispatch(eventActions.setLoading(false));
        }
    };
}



export function toggleBookEvent(eventId) {
    return async (dispatch, getState) => {
        try {
            const token = getState().auth.user.token; 
            const response = await request.put(`/book/${eventId}`, {}, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            console.log("Booking response: ", response);
            dispatch(eventActions.bookdEvent(response.data));
            // console.log("Booking response: ", response.data);
            // toast.success("Event booked successfully!");
        } catch (error) {
            console.error("Error booking event:", error);
            toast.error(error.response.data.message);
        }
    };
}

export function deleteEvent(eventId) {
    return async (dispatch, getState) => {
        try {
            dispatch(eventActions.setLoading(true));
            const token = getState().auth.user.token; 
            await request.delete(`/events/admin/delete-event/${eventId}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            dispatch(eventActions.setLoading(false));
            // toast.success("Event deleted successfully!");
            dispatch(getEvents());
        } catch (error) {
            console.error("Error deleting event:", error);
            dispatch(eventActions.setLoading(false));
            toast.error(error.response.data.message);
        }
    };
}

export function updateEvent(eventId, eventData) {
    return async (dispatch, getState) => {
        try {
            dispatch(eventActions.setLoading(true));
            const token = getState().auth.user.token; 
            await request.put(`/events/admin/update-event/${eventId}`, eventData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "multipart/form-data",
                },
            });
            dispatch(eventActions.setLoading(false));
            toast.success("Event updated successfully!");
            dispatch(getEvents());
        } catch (error) {
            console.error("Error updating event:", error);
            dispatch(eventActions.setLoading(false));
            toast.error(error.response.data.message);
        }
    };
}