import React from "react";
import HomeSection from "./HomeSection";
import {
  rnSetPadding,
  rnSetMargin,
  BASE_SPACE,
  borderTag,
  primaryColor,
  bgTag
} from "../../tools";
import EventCard from "../commons/EventCard";

const RecentEvents = ({ data }) => {
  return (
    <HomeSection
      title="Recently Added"
      subtitle="Discover the newest event, Be the first to get you access."
    >
      {data.map(e => (
        <EventCard key={e.key} data={e} />
      ))}
    </HomeSection>
  );
};

export default RecentEvents;
