import React from "react";
import HomeSection from "./HomeSection";
import EventCard from "../commons/EventCard";

const RecentEvents = ({ data }) => {
  return (
    <HomeSection
      title="Recently Added"
      subtitle="Discover the newest event, Be the first to get you access."
    >
      {[...data]
        .filter((e, i) => i < 10)
        .map(e => (
          <EventCard key={e.key} data={e} />
        ))}
    </HomeSection>
  );
};

export default RecentEvents;
