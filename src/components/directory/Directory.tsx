import React, { Component } from "react";
import styled from "@emotion/styled";
import { DirectoryProps, DirectoryState, Sections } from "custom-types";

import MenuItem from "../menuItem/MenuItem";

const DirectoryMenu = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`;

class Directory extends Component<DirectoryProps, DirectoryState> {
  state = {
    sections: [
      {
        id: 1,
        title: "hats",
        imageUrl: "https://i.ibb.co/cvpntL1/hats.png",
        linkUrl: "hats",
      },
      {
        id: 2,
        title: "jackets",
        imageUrl: "https://i.ibb.co/px2tCc3/jackets.png",
        linkUrl: "jackets",
      },
      {
        id: 3,
        title: "sneakers",
        imageUrl: "https://i.ibb.co/0jqHpnp/sneakers.png",
        linkUrl: "sneakers",
      },
      {
        id: 4,
        title: "women's",
        imageUrl: "https://i.ibb.co/GCCdy8t/womens.png",
        linkUrl: "womens",
        size: "large",
      },
      {
        id: 5,
        title: "men's",
        imageUrl: "https://i.ibb.co/R70vBrQ/men.png",
        linkUrl: "mens",
        size: "large",
      },
    ] as Sections,
  } as DirectoryState;

  render() {
    return (
      <DirectoryMenu>
        {this.state.sections.map(({ id, ...sectionProps }) => (
          <MenuItem key={id as number} {...sectionProps} />
        ))}
      </DirectoryMenu>
    );
  }
}

export default Directory;