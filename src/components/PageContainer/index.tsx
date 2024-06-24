import { Card, Container } from "@radix-ui/themes";
import React from "react";

type PageContainerProps = {} & React.PropsWithChildren;

const PageContainer: React.FC<PageContainerProps> = ({ children }) => {
  return (
    <Container
      style={{
        width: "100%",
        display: "flex",
        minHeight: "100vh",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "space-between",
        padding: 24,
      }}
    >
      <Card
        style={{
          width: "100%",
        }}
      >
        {children}
      </Card>
    </Container>
  );
};

export default PageContainer;
