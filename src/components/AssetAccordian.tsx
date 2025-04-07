import { useState } from "react";
import { Box, Button } from "@mui/material";
import SidebarItems from "./Sidebar/SidebarItems";

const AssetAccordian = () => {
  const drawerWidth = 320;
  const collapsedWidth = 60;
  const [showSidebar, setShowSidebar] = useState(true);

  return (
    <Box
      sx={{
        width: showSidebar ? drawerWidth : collapsedWidth,
        transition: "width 0.3s ease",
        height: "100vh",
        backgroundColor: "#f5f5f5",
        borderRight: "1px solid #ddd",
        px: showSidebar ? 2 : 1,
        py: 3,
        overflowY: "auto",
        display: "flex",
        flexDirection: "column",
        alignItems: showSidebar ? "flex-start" : "center",
      }}
    >
      {/* Toggle Button */}
      <Button
        onClick={() => setShowSidebar(!showSidebar)}
        variant="contained"
        size="small"
        sx={{
          mt: 4, // Add vertical margin from the top
          mb: -2,
          minWidth: 0,
          px: 1,
        }}
      >
        {showSidebar ? "Hide" : "Show"}
      </Button>

      {/* Only render contents if open */}
      {showSidebar && <SidebarItems />}
    </Box>
  );
};

export default AssetAccordian;
