import { Alert, AlertIcon, AlertTitle } from "@chakra-ui/react";

export const AlertStatus = ({ message }: { message: string }) => {
  return (
    <Alert
      status="info"
      variant="subtle"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      textAlign="center"
      height="200px"
      marginTop={"5rem"}
    >
      <AlertIcon boxSize="40px" mr={0} />
      <AlertTitle mt={4} mb={1} fontSize="lg">
        <p style={{ marginTop: "3%", marginBottom: "7%" }}>{message}</p>
      </AlertTitle>
    </Alert>
  );
};
