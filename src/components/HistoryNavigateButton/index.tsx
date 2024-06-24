import { ArrowRightIcon } from "@radix-ui/react-icons";
import { Button, Flex } from "@radix-ui/themes";
import Link from "next/link";
import React from "react";

type HistoryNavigateButtonProps = {};

const HistoryNavigateButton: React.FC<HistoryNavigateButtonProps> = () => {
  return (
    <Flex align="center" justify="center">
      <Link href="/search" scroll={false}>
        <Button
          style={{
            width: "100%",
          }}
        >
          What is the weather in my place? <ArrowRightIcon />
        </Button>
      </Link>
    </Flex>
  );
};

export default HistoryNavigateButton;
