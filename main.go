package main

import (
	"bytes"
	"os"
	"io"
	"log"
	"crypto/ed25519"
	"encoding/hex"
	"encoding/json"
	"net/http"
	"strings"

	"github.com/bsdlp/discord-interactions-go/interactions"
	"github.com/Code-Hex/Neo-cowsay"
)

var discordPubkey []byte

func init() {
	var err error
	hexPublicKey := os.Getenv("DISCORD_PUBLIC_KEY")
	discordPubkey, err = hex.DecodeString(hexPublicKey)
	if err != nil {
		log.Fatal("Error decoding public key")
	}

}

func main() {

	http.HandleFunc("/", handleInteraction)

	certFile := os.Getenv("SSL_CERT")
	keyFile := os.Getenv("SSL_KEY")

	if certFile != "" && keyFile != "" {
		log.Println("Listening with TLS")
		log.Fatal(http.ListenAndServeTLS(":443", certFile, keyFile, nil))
	} else {
		log.Println("SSL variables not set. Using http")
		log.Fatal(http.ListenAndServe(":80", nil))
	}
}

func handleInteraction(w http.ResponseWriter, r *http.Request) {
	verified := interactions.Verify(r, ed25519.PublicKey(discordPubkey))
	if !verified {
		http.Error(w, "signature mismatch", http.StatusUnauthorized)
		return
	}

	defer r.Body.Close()
	var data interactions.Data
	err := json.NewDecoder(r.Body).Decode(&data)
	if err != nil {
		// handle error
	}

	// respond to ping
	if data.Type == interactions.Ping {
		_, err := w.Write([]byte(`{"type":1}`))
		if err != nil {
			// handle error
		}
		return
	}

	command := data.Data
	responseMessage := "ok"
	switch command.Name {
	case "cowsay":
		responseMessage = Cowsay(&command.Options, false)
	case "cowthink":
		responseMessage = Cowsay(&command.Options, true)
	default:
		log.Printf("unsupported command %s", command.Name)
	}

	// handle command
	response := &interactions.InteractionResponse{
		Type: 4,
		Data: &interactions.InteractionApplicationCommandCallbackData{
			Content: responseMessage,
		},
	}

	var responsePayload bytes.Buffer
	err = json.NewEncoder(&responsePayload).Encode(response)
	if err != nil {
		log.Println("Error encoding response")
	}

	resp, err := http.Post(data.ResponseURL(), "application/json", &responsePayload)
	if err != nil {
		log.Println("Error sending response")
	}
	if resp.StatusCode != 200 {
		log.Println("Error sending response")
		b, err := io.ReadAll(resp.Body)
		if err != nil {
			log.Println(err)
		}
		log.Println(string(b))
	}
}

func Cowsay(options *[]interactions.ApplicationCommandInteractionDataOption, think bool) string {
	cowsayOptions := []cowsay.Option{}
	for _, option := range(*options) {
		if option.Name == "message" {
			message, _ := option.Value.(string)
			message = strings.ReplaceAll(message, "```", "\\`\\`\\`")
			cowsayOptions = append(cowsayOptions, cowsay.Phrase(message))
		}
		if option.Name == "cowfile" {
			cowfile, _ := option.Value.(string)
			cowsayOptions = append(cowsayOptions, cowsay.Type(cowfile))

		}
	}

	if think {
		cowsayOptions = append(cowsayOptions, cowsay.Thinking())
	}

	cow, _ := cowsay.Say(cowsayOptions...)
	return "```" + cow + "```"
}
