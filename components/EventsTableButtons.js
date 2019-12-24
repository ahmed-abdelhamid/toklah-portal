import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import CheckboxMarkedCircleOutlineIcon from 'mdi-material-ui/CheckboxMarkedCircleOutline';
import CheckboxMarkedCircleIcon from 'mdi-material-ui/CheckboxMarkedCircle';
import FileDocumentBoxIcon from 'mdi-material-ui/FileDocumentBox';
import EventDetails from './EventDetails';

import translations from '../translations/arabicTranslation';
import { acceptEvent } from '../redux/actions/eventsActions';

const EventsTableButtons = ({ event, token }) => {
  const [openEventDetails, setOpenEventDetails] = useState(false);
  const dispatch = useDispatch();

  return (
    <>
      <Tooltip title={translations.SHOW_DETAILS}>
        <IconButton color="primary" onClick={() => setOpenEventDetails(true)}>
          <FileDocumentBoxIcon />
        </IconButton>
      </Tooltip>

      {!event.isValid && (
        <Tooltip title={translations.ACCEPT_REQUEST}>
          <IconButton color="primary" onClick={() => dispatch(acceptEvent(token, event.eventId))}>
            <CheckboxMarkedCircleOutlineIcon />
          </IconButton>
        </Tooltip>
      )}

      {event.isValid && (
        <Tooltip title={translations.ACCEPTED}>
          <span>
            <IconButton color="primary" disabled>
              <CheckboxMarkedCircleIcon />
            </IconButton>
          </span>
        </Tooltip>
      )}

      {openEventDetails && (
        <EventDetails
          open={openEventDetails}
          onClose={() => setOpenEventDetails(false)}
          event={event}
          token={token}
        />
      )}
    </>
  );
};

export default EventsTableButtons;
