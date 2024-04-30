import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import Button from "@mui/joy/Button";
import Typography from "@mui/joy/Typography";
import {
  Head,
  Eventname,
  Eventadd,
  Eventtime,
  Tickets,
  CardGroup,
  Text,
  StyledCard,
  StyledCardOverflow,
  StyledAspectRatio,
  StyledIconButton,
  StyledCardContent,
  StyledCardTypography,
  CardOutline,
  StyledButtonGroup,
} from "../../Home/components/atoms.js";
import {
  fetchEventsRequest,
  fetchFilteredEventsRequest,
} from "../redux/action/action.js";
import { vector } from "../../../assets/index.js";
import { ticket, ellipse, star, icon1 } from "../../../assets/index.js";
import { useParams } from "react-router-dom";
import { format, addDays, isSameDay } from "date-fns"; // Import isSameDay

const Onlineevents = ({ events, loading, fetchFilteredEventsRequest }) => {
  const [startIdx, setStartIdx] = useState(0);
  const { category_id } = useParams();

  useEffect(() => {
    fetchFilteredEvents({ category_id, dates: [getCurrentDate()] }); // Pass current date only
  }, [category_id]);

  useEffect(() => {
    setStartIdx(0);
  }, [category_id]);

  useEffect(() => {
    console.log("Events:", events);
  }, [events]);

  const getCurrentDate = () => {
    return new Date().toISOString().slice(0, 10); // Return current date in YYYY-MM-DD format
  };

  const handleTodayClick = () => {
    const today = getCurrentDate();
    fetchFilteredEvents({ category_id, dates: [today] });
  };

  const handleTomorrowClick = () => {
    const tomorrow = addDays(new Date(), 1).toISOString().slice(0, 10); // Get tomorrow's date in YYYY-MM-DD format
    console.log(tomorrow);
    fetchFilteredEvents({ category_id, dates: [tomorrow] });
  };

  const fetchFilteredEvents = (data) => {
    fetchFilteredEventsRequest(data);
  };

  const formatDateRange = (start, end) => {
    const startDate = format(new Date(start), "d MMM");
    const endDate = format(new Date(end), "d MMM");
    return `${startDate} - ${endDate}`;
  };

  const formatEventTime = (start, end) => {
    const startTime = format(new Date(start), "h:mm a");
    const endTime = format(new Date(end), "h:mm a");
    return `${startTime} - ${endTime}`;
  };

  return (
    <>
      <Head>Most Popular Events</Head>
      <StyledButtonGroup
        sx={{
          borderRadius: 8,
        }}
      >
        <Button className="btn-default" onClick={handleTodayClick}>
          Today
        </Button>
        <Button className="btn-tom" onClick={handleTomorrowClick}>
          Tomorrow
        </Button>
        <Button className="btn-week">This Weekend</Button>
        <Button className="btn-free">Free</Button>
      </StyledButtonGroup>

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
              <Typography level="body-sm">
                <Eventname>{event.Additional_information}</Eventname>
                <Eventadd>{event.location}</Eventadd>
                <Eventtime>
                  {formatEventTime(event.start_date_time, event.end_date_time)}
                </Eventtime>
              </Typography>
              <Tickets className="tickets" orientation="horizontal">
                <div className="price">
                  <img src={ticket} alt="Ticket Icon" />
                  INR 1,400
                </div>
                <div className="ellipse">
                  <img src={ellipse} alt="Ellipse Icon" />
                </div>
                <div className="interested">
                  <img src={star} alt="Star Icon" />
                  14 interested
                </div>
              </Tickets>
            </StyledCardContent>
          </StyledCard>
        ))}
      </CardOutline>
    </>
  );
};

const mapStateToProps = (state) => ({
  events: state.event.events,
  loading: state.event.loading,
});

const mapDispatchToProps = {
  fetchFilteredEventsRequest,
};

export default connect(mapStateToProps, mapDispatchToProps)(Onlineevents);
