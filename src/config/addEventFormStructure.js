import React from "react";
import { Button, Icon, Text } from "native-base";

const addEventFormStructure = (
  categories = [],
  ticketTypes = [],
  deleteFunc = () => alert("clicked btn")
) => {
  return {
    cover: { type: "image", label: "Event Cover" },
    name: { label: "Event Name", placeholder: "My awesome event" },
    location: { label: "Event Location", placeholder: "My event location" },
    description: { type: "textarea", label: "Event Description" },
    category: { type: "picker", label: "Event Category", data: categories },
    date: { type: "date", label: "Event Date & hour" },
    price: {
      label: "Event Price",
      placeholder: "Any price"
    }
  };
};

export default addEventFormStructure;
