import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import axios from "axios";
import "./ContentModal.css";
import {Table} from 'react-bootstrap'

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    width: "90%",
    height: "80%",
    backgroundColor: "#39445a",
    border: "1px solid #282c34",
    borderRadius: 10,
    color: "white",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(1, 1, 3),
  },
}));

export default function TransitionsModal({ children, id }) {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [content, setContent] = useState();

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const fetchData = async () => {
    const { data } = await axios.get(
      `http://localhost:3001/search/releasesByArtist/?query=${id}`
    );

    if(data.response["release-groups"].length > 0){
      setContent(data);

    }
    console.log(data);
    console.log(data.response["release-groups"]);
    console.log(data.response["sort-name"]);
    console.log(data.response["release-groups"].map(i => `${i.title}`));
  };


  useEffect(() => {
    fetchData();
    // eslint-disable-next-line
  }, []);

  return (
    <>
      <div
        className="media"
        style={{ cursor: "pointer" }}
        color="inherit"
        onClick={handleOpen}
      >
        {children}
      </div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          {content && (
            <div className={classes.paper}>
              
              <h1>Album List for {content.response["sort-name"]}</h1>
              <Table striped variant="dark" >
                   
                    <tbody>  
                          {content.response["release-groups"].map(i => <tr>
                        <td>{i.title}</td>
                      </tr>)}
                        
                    </tbody>

                    </Table>
              </div>
            
          )}
        </Fade>
      </Modal>
    </>
  );
}
