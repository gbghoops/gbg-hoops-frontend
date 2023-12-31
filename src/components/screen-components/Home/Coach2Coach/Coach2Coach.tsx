import React, { useState } from "react";
import Button from "@src/components/button/Button";
import Link from "@src/components/link/Link";
import { Sheet, Text, View } from "tamagui";

const Coach2Coach = () => {
    const [sheetOpen, setSheetOpen] = useState(false);
    return (
        <>
            <View mt={"$40"} mx={"$20"}>
                <View backgroundColor={"$surface_primary"} p={"$20"} pb="$30">
                    <Text
                        textTransform="uppercase"
                        textAlign="center"
                        fontSize="$24"
                        fontFamily={"$heading"}
                        my="$10"
                    >
                        Coach2Coach
                    </Text>
                    <Text
                        textAlign="center"
                        fontFamily="$body"
                        fontSize="$16"
                        lineHeight={20}
                        px="$20"
                    >
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                        sed do eiusmod tempor incididunt ut labore et dolore
                        magna aliqua.
                    </Text>
                    <View fd="row" jc="center" mt="$20">
                        <Button
                            text="BOOK CALL"
                            onPress={() => {
                                setSheetOpen(true);
                            }}
                        />
                    </View>
                </View>
            </View>

            <Sheet
                forceRemoveScrollEnabled={sheetOpen}
                modal={true}
                open={sheetOpen}
                snapPointsMode="fit"
                onOpenChange={setSheetOpen}
                dismissOnSnapToBottom
                zIndex={100_000}
                animation="fast"
            >
                <Sheet.Overlay
                    animation="slow"
                    enterStyle={{ opacity: 0 }}
                    exitStyle={{ opacity: 0 }}
                    backgroundColor={"rgba(20,20,20,0.75)"}
                />

                <Sheet.Frame
                    padding="$10"
                    space="$5"
                    backgroundColor={"$surface_primary"}
                >
                    <Sheet.Handle
                        mb="$10"
                        height={"$4"}
                        width={"$80"}
                        mx="auto"
                        backgroundColor={"rgb(220, 220, 220)"}
                        opacity={0.35}
                        animation={"fast"}
                    />
                    <View my={"$20"} px={"$20"}>
                        <Text
                            fontFamily={"$heading"}
                            fontSize={"$24"}
                            textTransform="uppercase"
                            textAlign="left"
                        >
                            Book your coach2coach call
                        </Text>
                        <Text
                            mt="$16"
                            fontFamily="$body"
                            fontSize="$16"
                            lineHeight={20}
                        >
                            {`Want one on one coaching? Have questions you want answered directly?\n\nSet up a $x half hour call with Coach Mike.`}
                        </Text>
                        <View mt={"$20"} fd="row">
                            <Link onPress={() => {}}>Follow this lnk</Link>
                            <Text fontFamily={"$body"} fontSize="$16">
                                {" "}
                                to set up your call.
                            </Text>
                        </View>
                        <View mt="$30" mb="$10" width={"100%"}>
                            <Button
                                text="CANCEL"
                                fullWidth
                                secondary_transparent
                                onPress={() => {
                                    setSheetOpen(false);
                                }}
                            />
                        </View>
                    </View>
                </Sheet.Frame>
            </Sheet>
        </>
    );
};

export default Coach2Coach;
