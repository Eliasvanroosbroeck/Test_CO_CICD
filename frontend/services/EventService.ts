const getAllEvents = async () => {
    console.log(process.env.REACT_APP_URL+'events')
    const token = sessionStorage.getItem("token");
    return await fetch(process.env.NEXT_PUBLIC_API_URL+'events',
    {
        method: "GET",
        headers:{
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        }
    });
}

const getEventByID = async (eventId: string) => {
  return await fetch(process.env.NEXT_PUBLIC_API_URL+'events/'+eventId);
}

const addEvent = async (eventData: any) => {
    try {
      const response = await fetch(process.env.NEXT_PUBLIC_API_URL + 'events', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept' : 'application/json'
        },
        body: JSON.stringify(eventData),
      });
      console.log(eventData)
      console.log(response)
      return response;
    } catch (error) {
      // Handle any errors that occurred during the request
      console.error('Error registering event:', error);
      throw error;
    }
  };

const updateEvent = async (eventData: any) => {
  try {
    console.log("functie wordt gecalled")
    const response = await fetch(process.env.NEXT_PUBLIC_API_URL+'events', {
    method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(eventData),
    });
    console.log(eventData);
    console.log(response);
    return response;
  } catch (error) {
    // Handle any errors that occurred during the request
    console.error('Error updating event:', error);
    throw error;
  }
};

const deleteEvent = async (eventId: number) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}events/${eventId}`,
      {
        method: 'DELETE',
      }
    );
    if (response.ok) {
      // Event deleted successfully
      return;
    } else {
      throw new Error('Failed to delete event');
    }
  } catch (error) {
    // Handle any errors that occurred during the request
    console.error('Error deleting event:', error);
    throw error;
  }
};

const EventsService = {
    getAllEvents,
    getEventByID,
    addEvent,
    updateEvent,
    deleteEvent,
}

export default EventsService