import React, { useState, useEffect } from "react";
import "./Footer.css";

import axios from "axios";
import { H3, H4, H6 } from "../Text/Text";
import { Flex } from "../UI/Flex/Flex";
import { Icon } from "../Icon/Icon";

export const Footer = () => {
  return (
    <div className="footer">
      <Flex margin="30px" width="100%" justifyContent="space-around">
        <H4>About</H4>
        <H4>Safety</H4>

        <H4>Support</H4>

        <H4>Blog</H4>
      </Flex>

      <Flex width="100%" justifyContent="space-around">
        <Icon
          link="https://www.instagram.com/baadhira_/"
          icon="fab fa-instagram"
        />
        <Icon
          link="https://www.facebook.com/Matrixx-Designs-106216728193251"
          icon="fab fa-facebook-f"
        />
        <Icon
          link="https://www.instagram.com/matrixxdesigns/"
          icon="fab fa-youtube"
        />
        <Icon
          link="https://www.instagram.com/matrixxdesigns/"
          icon="fab fa-twitter"
        />
      </Flex>

      <H6 margin="30px">© 2022 rights reserverd</H6>
    </div>
  );
};
