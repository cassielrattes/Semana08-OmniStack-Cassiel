import React, { useEffect, useState } from "react";
import io from "socket.io-client";
import { Link } from "react-router-dom";
import "./Main.css";

import logo from "../assets/logo.svg";
import dislike from "../assets/dislike.svg";
import like from "../assets/like.svg";
import itsamatch from "../assets/itsamatch.png";
import api from "../services/api";

export default function Main({ match }) {
  const [users, setUsers] = useState([]);
  const [matchDev, setMatchDev] = useState(null);

  useEffect(() => {
    async function loadUsers() {
      const response = await api.get("/devs", {
        headers: { user: match.params.id }
      });
      setUsers(response.data);
    }
    loadUsers();
  }, [match.params.id]);

  useEffect(() => {
    const socket = io("http://localhost:5000", {
      query: { user: match.params.id }
    });

    socket.on("match", dev => {
      setMatchDev(dev);
    });
  }, [match.params.id]);

  async function handleLike(id) {
    await api.post(`/devs/${id}/likes`, null, {
      headers: {
        user: match.params.id
      }
    });

    setUsers(users.filter(user => user._id !== id));
  }

  async function handleDislike(id) {
    await api.post(`/devs/${id}/dislikes`, null, {
      headers: {
        user: match.params.id
      }
    });

    setUsers(users.filter(user => user._id !== id));
  }

  return (
    <div className="main-container">
      <Link to="/">
        <img src={logo} alt="Tindev" />
      </Link>
      {users.length > 0 ? (
        <ul>
          {users.map(user => (
            <li key={user._id}>
              <img src={user.avatar} alt="Developer" />
              <footer>
                <strong>{user.name}</strong>
                <p>{user.bio}</p>
              </footer>

              <div className="buttons">
                <button type="button" onClick={() => handleDislike(user._id)}>
                  <img src={dislike} alt="" />
                </button>
                <button type="button" onClick={() => handleLike(user._id)}>
                  <img src={like} alt="" />
                </button>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <div className="empty">Acabou :(</div>
      )}

      {matchDev && (
        <div className="match-container">
          <img src={itsamatch} alt="its a match" />
          <img className="avatar" src={matchDev.avatar} alt="its a match" />
          <strong>{matchDev.name}</strong>
          <p>{matchDev.bio}</p>
          <button onClick={() => setMatchDev(null)} type="button">
            FECHAR
          </button>
        </div>
      )}
    </div>
  );
}
