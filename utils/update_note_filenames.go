package main

import (
	"fmt"
	"io/ioutil"
	"log"
	"os"
	"path/filepath"
	"regexp"
	"strings"
	"time"
)

func main() {
	notesDir := "/home/kamutiv/world/utils/notes"
	
	files, err := filepath.Glob(filepath.Join(notesDir, "*.html"))
	if err != nil {
		log.Fatalf("Error finding HTML files: %v", err)
	}

	for _, filePath := range files {
		content, err := ioutil.ReadFile(filePath)
		if err != nil {
			log.Printf("Error reading file %s: %v", filePath, err)
			continue
		}

		// Extract timestamp from HTML content
		timestampRe := regexp.MustCompile(`(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec) (\d{1,2}), (\d{4}), (\d{1,2}):(\d{2}):(\d{2})`)
		matches := timestampRe.FindStringSubmatch(string(content))
		if len(matches) < 7 {
			log.Printf("No timestamp found in %s", filePath)
			continue
		}

		// Parse the timestamp
		timeStr := fmt.Sprintf("%s %s, %s %s:%s:%s", 
			matches[1], matches[2], matches[3], matches[4], matches[5], matches[6])
		parsedTime, err := time.Parse("Jan 2, 2006 15:04:05", timeStr)
		if err != nil {
			log.Printf("Error parsing time %s in %s: %v", timeStr, filePath, err)
			continue
		}

		// Format the new filename
		newName := parsedTime.Format("2006-01-02T15_04_05.000-07_00")
		newPath := filepath.Join(notesDir, newName+".html")

		// Check if we need to rename
		currentName := filepath.Base(filePath)
		if currentName == newName+".html" {
			continue
		}

		// Rename the file
		log.Printf("Renaming %s to %s\n", currentName, newName+".html")
		err = os.Rename(filePath, newPath)
		if err != nil {
			log.Printf("Error renaming %s to %s: %v\n", filePath, newPath, err)
		}

		// Also rename the corresponding JSON file if it exists
		jsonPath := strings.TrimSuffix(filePath, ".html") + ".json"
		if _, err := os.Stat(jsonPath); err == nil {
			newJsonPath := filepath.Join(notesDir, newName+".json")
			err = os.Rename(jsonPath, newJsonPath)
			if err != nil {
				log.Printf("Error renaming JSON file %s to %s: %v\n", jsonPath, newJsonPath, err)
			}
		}
	}
}
