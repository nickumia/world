package main

import (
	"encoding/csv"
	"encoding/json"
	"fmt"
	"io/ioutil"
	"log"
	"os"
	"path/filepath"
	"strings"
)

type Note struct {
	Timestamp string
	Content   string
}

type JsonNote struct {
	TextContent string `json:"textContent"`
}

func main() {
	// Define input and output paths
	notesDir := "/home/kamutiv/world/notes"
	outputFile := "/home/kamutiv/world/notes_export.csv"

	// Get all note files
	files, err := ioutil.ReadDir(notesDir)
	if err != nil {
		log.Fatalf("Error reading notes directory: %v", err)
	}

	var notes []Note

	// Process each JSON file
	for _, file := range files {
		filename := file.Name()
		if strings.HasSuffix(filename, ".json") {
			timestamp := strings.TrimSuffix(filename, filepath.Ext(filename))
			content, err := processJSONFile(filepath.Join(notesDir, filename))
			if err != nil {
				log.Printf("Error processing file %s: %v", filename, err)
				continue
			}

			// Clean up the content
			content = strings.TrimSpace(content)
			if content == "" {
				continue
			}

			notes = append(notes, Note{
				Timestamp: timestamp,
				Content:   content,
			})
		}
	}

	// Write to CSV
	err = writeToCSV(outputFile, notes)
	if err != nil {
		log.Fatalf("Error writing to CSV: %v", err)
	}

	fmt.Printf("Successfully exported %d notes to %s\n", len(notes), outputFile)
}

func processJSONFile(filepath string) (string, error) {
	content, err := ioutil.ReadFile(filepath)
	if err != nil {
		return "", fmt.Errorf("error reading file: %v", err)
	}

	// Parse JSON file
	var note JsonNote
	if err := json.Unmarshal(content, &note); err != nil {
		return "", fmt.Errorf("error parsing JSON: %v", err)
	}
	return note.TextContent, nil
}

func writeToCSV(filename string, notes []Note) error {
	file, err := os.Create(filename)
	if err != nil {
		return fmt.Errorf("error creating CSV file: %v", err)
	}
	defer file.Close()

	// Create a CSV writer with custom settings
	writer := csv.NewWriter(file)
	writer.UseCRLF = true // Use CRLF line endings for better compatibility
	defer writer.Flush()

	// Write header
	header := []string{"timestamp", "content"}
	if err := writer.Write(header); err != nil {
		return fmt.Errorf("error writing header: %v", err)
	}

	// Write data
	for _, note := range notes {
		// Ensure content is properly escaped for CSV
		content := strings.ReplaceAll(note.Content, "\r\n", "\n") // Normalize line endings
		record := []string{
			note.Timestamp,
			content,
		}
		if err := writer.Write(record); err != nil {
			return fmt.Errorf("error writing record: %v", err)
		}
	}

	return nil
}
