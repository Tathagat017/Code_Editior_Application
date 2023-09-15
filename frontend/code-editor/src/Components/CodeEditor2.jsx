import { useState } from "react";
import {
  Box,
  Button,
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure,
  useToast,
  Select,
  Spinner,
} from "@chakra-ui/react";
import AceEditor from "react-ace";
import axios from "axios";
import "brace/mode/javascript";
import "brace/theme/monokai";
import "@fontsource/titillium-web/400.css";

const Main2 = () => {
  const [code, setCode] = useState("");
  const [transpiledCode, setTranspiledCode] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [langCode, setLang] = useState("");
  const [select, setSelect] = useState("");
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [feedback, setFeedback] = useState("");
  const handleCodeChange = (newCode) => {
    setCode(newCode);
  };

  const handleTranspile = async () => {
    try {
      // console.log(code);
      setLoading((t) => true);
      const response = await axios.post(
        "https://codeeditor-sho0.onrender.com/exe",
        {
          code,
        }
      );
      console.log(response);
      setTranspiledCode(response.data.code);
      setLoading((t) => false);
      setError(null); // Reset error if the request is successful
      onOpen(); // Open the drawer after successful transpile
      setLang("");
    } catch (error) {
      setLoading((t) => false);
      console.error("Error:", error.message);
      setError("Something went wrong. Please try again."); // Set the error message
    }
  };

  async function handleLanguageSwitch(item) {
    console.log(item);
    try {
      setLoading((t) => true);
      const response = await axios.post(
        "https://codeeditor-sho0.onrender.com/lang",
        {
          code,
          language: item,
        }
      );
      console.log(response);
      setLoading((t) => false);
      setLang(response.data.code);
      setSelect(item);
      setError(null); // Reset error if the request is successful
    } catch (error) {
      setLoading((t) => false);
      console.error("Error:", error.message);
      setError("Something went wrong. Please try again."); // Set the error message
    }
  }

  async function handleCheckCode() {
    try {
      setLoading((t) => true);
      const response = await axios.post(
        "https://codeeditor-sho0.onrender.com/quality",
        {
          code,
        }
      );
      console.log(response);
      setLoading((t) => false);
      let x = response.data.code.split("\n");
      console.log(x);

      setFeedback(x);
      setError(null); // Reset error if the request is successful
    } catch (error) {
      setLoading((t) => false);
      console.error("Error:", error.message);
      setError("Something went wrong. Please try again."); // Set the error message
    }
  }

  return (
    <Box
      display="flex"
      width="100%"
      mt={"0.5%"}
      mb={"0.5%"}
      style={{ fontFamily: "Titillium Web" }}
    >
      {/* Code Editor Box */}
      <Box flex="1" minWidth="0">
        <AceEditor
          mode="javascript"
          theme="monokai"
          value={code}
          onChange={handleCodeChange}
          style={{ width: "100%", height: "100%", minHeight: "28rem" }}
          fontSize={"1.1rem"}
        />
      </Box>
      {loading ? (
        <Spinner
          thickness="4px"
          speed="0.65s"
          emptyColor="gray.200"
          color="blue.500"
          size="xl"
          width="150px"
          margin="50 auto"
        ></Spinner>
      ) : (
        <Box width="50%" position="relative">
          <Button
            onClick={handleTranspile}
            size="md"
            borderColor="rgb(0, 215, 253)"
            _hover={{
              cursor: "pointer",
              backgroundColor: "rgb(52, 180, 223)",
            }}
            mr="2%"
            variant={"outline"}
          >
            Execute Code
          </Button>
          <Button
            onClick={handleCheckCode}
            size="md"
            ml="1%"
            borderColor="rgb(0, 215, 253)"
            _hover={{
              cursor: "pointer",
              backgroundColor: "rgb(52, 180, 223)",
            }}
            variant={"outline"}
          >
            Check Code Quality
          </Button>

          <Select
            onChange={(e) => handleLanguageSwitch(e.target.value)}
            placeholder="Convert code into"
            m="auto"
            w={"65%"}
            mt="2%"
          >
            <option value="JavaScript">JavaScript</option>
            <option value="C">C</option>
            <option value="C++">C++</option>
            <option value="Java">Java</option>
            <option value="Python">Python</option>
          </Select>

          {langCode && (
            <Box padding="2%" m="1%">
              Transpile: Code in {select}:{" "}
              <Box border="3px solid black" mt="2%">
                {langCode}
              </Box>
            </Box>
          )}
          {error && <Box>Error: {error}</Box>}
          {feedback && (
            <Box>
              <p>Feedback : Coding Quality</p>
              <Box border="5px dashed black">
                {feedback.map((el) => {
                  return <p key={Date.now() + Math.random()}>{el}</p>;
                })}{" "}
              </Box>
            </Box>
          )}
          <Box>
            <Drawer
              placement="right"
              onClose={onClose}
              isOpen={isOpen}
              size="lg"
            >
              <DrawerOverlay />
              <DrawerContent
                backgroundColor=" #3e4241"
                borderLeftRadius="20px"
                paddingRight="0"
                boxShadow="0px 4px 16px rgba(0, 0, 0, 0.25)"
                maxW="50%" // Limit the drawer width to 50%
                color="rgb(255, 255, 255, 255)"
              >
                <DrawerCloseButton />
                <DrawerHeader style={{ display: "block", margin: "0 auto" }}>
                  Terminal Output
                </DrawerHeader>
                <DrawerBody>
                  <Box m="auto" style={{ textAlign: "center" }}>
                    <pre>{transpiledCode}</pre>
                  </Box>
                </DrawerBody>
              </DrawerContent>
            </Drawer>
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default Main2;
