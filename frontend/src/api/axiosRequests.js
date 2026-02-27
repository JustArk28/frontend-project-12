import axios from "axios";
import routes from "../routes";
import { logIn } from "../slices/authSlice";
import { getChannels } from "../slices/channelsSlice";
import { getMessages } from "../slices/messagesSlice";
import filter from "leo-profanity";
import { toast } from "react-toastify";

export const userLogIn = async (
  values,
  setLoading,
  navigate,
  dispatch,
  setAuthFailed,
  inputRef,
) => {
  setLoading(true);
  try {
    const response = await axios.post(routes.loginPath(), values);
    localStorage.setItem("user", JSON.stringify(response.data));
    navigate("/");
    const user = localStorage.getItem("user");
    const { token, username } = JSON.parse(user);
    dispatch(logIn({ token, username }));
  } catch (err) {
    if (err.status === 401) {
      setAuthFailed(true);
      inputRef.current.select();
      return;
    }
    throw err;
  } finally {
    setLoading(false);
  }
};

export const userSignUp = async (
  setUserExist,
  setLoading,
  navigate,
  username,
  password,
  dispatch,
  inputRef,
) => {
  setUserExist(false);
  setLoading(true);
  try {
    await axios
      .post(routes.SignUpPath(), { username, password })
      .then((response) => {
        localStorage.setItem("user", JSON.stringify(response.data));
        navigate("/");
        const user = localStorage.getItem("user");
        const { token, username } = JSON.parse(user);
        dispatch(logIn({ token, username }));
      });
  } catch (err) {
    console.log(err);
    if (err.status === 409) {
      setUserExist(true);
      inputRef.current.select();
      return;
    }
    throw err;
  } finally {
    setLoading(false);
  }
};

export const sendMessage = async (
  message,
  resetForm,
  setLoading,
  t,
  currentChannelId,
  token,
  username,
  inputRef,
) => {
  setLoading(true);
  try {
    const newMessage = {
      body: filter.clean(message.trim()),
      channelId: currentChannelId,
      username: username,
    };
    await axios.post(routes.addMessage(), newMessage, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    resetForm();
    inputRef.current.focus();
  } catch (err) {
    console.log(err);
    setTimeout(() => {
      sendMessage();
    }, 5000);
    if (err.message === "Network Error") {
      toast.error(t("toastify.error.connectionError"));
    } else {
      toast.error(t("toastify.error.error"));
    }
  } finally {
    setLoading(false);
  }
};

export const addNewChannel = async (
  setLoading,
  channelName,
  t,
  token,
  setCurrentChannelId,
  handleClose,
) => {
  setLoading(true);
  try {
    const newChannel = { name: filter.clean(channelName.trim()) };
    await axios
      .post(routes.addChannel(), newChannel, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        if (response.status === 200) {
          setCurrentChannelId(response.data.id);
          handleClose();
          toast.success(t("toastify.success.add"));
        }
      });
  } catch (err) {
    console.log(err);
    if (err.message === "Network Error") {
      toast.error(t("toastify.error.connectionError"));
    } else {
      toast.error(t("toastify.error.error"));
    }
  } finally {
    setLoading(false);
  }
};

export const renameChannel = async (
  setLoading,
  newChannelName,
  currentChannel,
  t,
  token,
  handleCloseRename,
) => {
  setLoading(true);
  try {
    const editedChannel = { name: filter.clean(newChannelName.trim()) };
    await axios
      .patch(routes.editChannel(currentChannel.id), editedChannel, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        if (response.status === 200) {
          toast.success(t("toastify.success.rename"));
          handleCloseRename();
        }
      });
  } catch (err) {
    console.log(err);
    if (err.message === "Network Error") {
      toast.error(t("toastify.error.connectionError"));
    } else {
      toast.error(t("toastify.error.error"));
    }
  } finally {
    setLoading(false);
  }
};

export const removeChannel = async (
  setLoading,
  currentChannel,
  t,
  token,
  setCurrentChannelId,
  handleCloseRemove,
  messagesForDel,
) => {
  setLoading(true);
  try {
    await axios
      .delete(routes.removeChannel(currentChannel.id), {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        if (response.status === 200) {
          setCurrentChannelId("1");
          toast.success(t("toastify.success.remove"));
          handleCloseRemove();
        }
      });
    await messagesForDel.map(({ id }) => {
      try {
        axios.delete(routes.removeMessages(id), {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
      } catch (err) {
        console.log("remove messages", err);
        if (err.message === "Network Error") {
          toast.error(t("toastify.error.connectionError"));
        } else {
          toast.error(t("toastify.error.error"));
        }
      }
    });
  } catch (err) {
    console.log(err);
    if (err.message === "Network Error") {
      toast.error(t("toastify.error.connectionError"));
    } else {
      toast.error(t("toastify.error.error"));
    }
  } finally {
    setLoading(false);
  }
};

export const getPrevChannels = async (token, dispatch) => {
  await axios
    .get(routes.getChannels(), {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((response) => dispatch(getChannels(response.data)));
};

export const getPrevMessages = async (token, dispatch) => {
  await axios
    .get(routes.getMessages(), {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((response) => dispatch(getMessages(response.data)));
};
