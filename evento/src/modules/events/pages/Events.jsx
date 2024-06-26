import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import {
  Head,
  Text,
  StyledCard,
  StyledCardOverflow,
  StyledAspectRatio,
  StyledIconButton,
  StyledCardContent,
  StyledCardTypography,
  CardOutline,
} from "../../Home/components/atoms.js";
import {
  TypographyEvent,
  TicketSection,
  ButtonEvent,
} from "../components/index.js";
import {
  fetchEventsRequest,
  fetchFilteredEventsRequest,
} from "../redux/action/action.js";
import { vector, icon1 } from "../../../assets/index.js";
import { useParams } from "react-router-dom";
import { formatDateRange,  formatEventTime } from '../utils/EventUtils.jsx' ;

const Onlineevents = ({ events, loading, fetchFilteredEventsRequest }) => {
  const { category_id } = useParams();

  const [filters, setFilters] = useState({
    dates: [],
    is_paid: null,
    category_id,
  });

  useEffect(() => {
    let filterArr = {};

    if (filters?.is_paid != null) filterArr["is_paid"] = filters?.is_paid;

    if (filters?.category_id > 0)
      filterArr["category_id"] = filters?.category_id;

    if (Array.isArray(filters?.dates)) filterArr["dates"] = filters?.dates;

    fetchFilteredEvents(filterArr);
  }, [filters]);

  const fetchFilteredEvents = (data) => {
    fetchFilteredEventsRequest(data);
  };

  return (
    <>
      <Head>Most Popular Events</Head>
      <ButtonEvent categoryId={category_id} setFilters={setFilters} />
      <CardOutline style={{ display: "flex" }}>
        {events.map((event) => (
          <StyledCard
            key={event.id}
            variant="outlined"
            style={{ display: "flex", justifyContent: "space-between" }}
          >
            <StyledCardOverflow>
              <StyledAspectRatio ratio={2}>
                {JSON.parse(event.files).map((file, index) => (
                  <img key={index} src={file.path} alt={`Image ${file.path}`} />
                ))}
              </StyledAspectRatio>
              <StyledIconButton
                size="md"
                variant="solid"
                backgroundcolor="#fff"
              >
                <img src={vector} loading="lazy" alt="" />
              </StyledIconButton>
              <Text>{event.title}</Text>
            </StyledCardOverflow>
            <StyledCardContent>
              <StyledCardTypography level="title-md">
                <img src={icon1} alt="Icon" />
                {formatDateRange(event.start_date_time, event.end_date_time)}
              </StyledCardTypography>
              <TypographyEvent
                event={event}
                formatEventTime={formatEventTime}
              />
              <TicketSection event={event} />
            </StyledCardContent>
          </StyledCard>
        ))}
      </CardOutline>
    </>
  );
};

export default connect(
  ({ event: { events, loading } }) => ({
    events,
    loading,
  }),
  {
    fetchFilteredEventsRequest,
  }
)(Onlineevents);
