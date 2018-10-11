import React from "react";
import { Button, Icon, Text } from "native-base";

const addEventFormStructure = (
  categories = [],
  ticketTypes = [],
  deleteFunc = () => alert("clicked btn")
) => {
  return {
    cover: {
      type: "image",
      label: "Event Cover"
    },
    name: {
      label: "Event Name",
      placeholder: "My awesome event"
    },
    location: {
      label: "Event Location",
      placeholder: "My event location"
    },
    description: {
      type: "textarea",
      label: "Event Description"
    },
    category: {
      type: "picker",
      label: "Event Category",
      data: categories
    },
    date: {
      type: "date",
      label: "Event Date & hour"
    },
    price: {
      type: "container",
      label: "Event Prices",
      children: [
        {
          row: [
            {
              type: "picker",
              placeholder: "Ticket Type",
              data: ticketTypes
            },
            {
              type: "text",
              placeholder: "Ticket Price",
              keyboardType: "numeric"
            },
            {
              type: "btn",
              render: () => (
                <Button
                  onPress={deleteFunc}
                  style={{ marginBottom: BASE_SPACE }}
                  full
                  bordered
                >
                  <Icon name="plus" type="Feather" fontSize={14} />
                  <Text>Add Price</Text>
                </Button>
              )
            }
          ]
        }
      ]
    }
  };
};

export default addEventFormStructure;
