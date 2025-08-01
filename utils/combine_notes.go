package main

import (
	"fmt"
	"io/ioutil"
	"log"
	"path/filepath"
	"sort"
	"strings"
	"time"
)

type Note struct {
	Timestamp time.Time
	Content   string
}

func main() {
	// Define input and output paths
	notesDir := "/home/kamutiv/world/notes"
	outputFile := "/home/kamutiv/world/combined_notes.html"

	// Get all note files
	files, err := ioutil.ReadDir(notesDir)
	if err != nil {
		log.Fatalf("Error reading notes directory: %v", err)
	}

	var notes []Note

	// Process each HTML file
	for _, file := range files {
		filename := file.Name()
		if strings.HasSuffix(filename, ".html") {
			// Parse timestamp from filename
			timestampStr := strings.TrimSuffix(filename, filepath.Ext(filename))
			timestampStr = strings.ReplaceAll(timestampStr, "_", ":")
			timestamp, err := time.Parse("2006-01-02T15:04:05.000-07:00", timestampStr)
			if err != nil {
				log.Printf("Error parsing timestamp from %s: %v", filename, err)
				continue
			}

			// Read file content
			content, err := ioutil.ReadFile(filepath.Join(notesDir, filename))
			if err != nil {
				log.Printf("Error reading file %s: %v", filename, err)
				continue
			}

			// Convert content to string and extract just the note content
			// This assumes the HTML has a specific structure where the content is in a div with class 'content'
			contentStr := string(content)
			startTag := "<div class=\"content\">"
			endTag := "</div>"
			
			startIdx := strings.Index(contentStr, startTag)
			if startIdx != -1 {
				startIdx += len(startTag)
				endIdx := strings.Index(contentStr[startIdx:], endTag)
				if endIdx != -1 {
					contentStr = contentStr[startIdx:startIdx+endIdx]
				}
			}

			notes = append(notes, Note{
				Timestamp: timestamp,
				Content:   contentStr,
			})
		}
	}

	// Sort notes by timestamp (oldest first)
	sort.Slice(notes, func(i, j int) bool {
		return notes[i].Timestamp.Before(notes[j].Timestamp)
	})

	// Generate HTML output
	htmlContent := `<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Combined Notes</title>
    <style>
        body {
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
            line-height: 1.6;
            color: #333;
            max-width: 800px;
            margin: 0 auto;
            padding: 20px;
        }
        .note {
            margin-bottom: 2em;
            padding: 15px;
            border-left: 4px solid #4CAF50;
            background-color: #f9f9f9;
        }
        .timestamp {
            color: #666;
            font-size: 0.9em;
            margin-bottom: 0.5em;
        }
        .content {
            white-space: pre-wrap;
        }
        h1 {
            color: #2c3e50;
            border-bottom: 1px solid #eee;
            padding-bottom: 10px;
        }
    </style>
</head>
<body>
    <h1>Combined Notes</h1>
`

	// Add notes to HTML content
	for _, note := range notes {
		htmlContent += fmt.Sprintf(`
    <div class="note">
        <div class="timestamp">%s</div>
        <div class="content">%s</div>
    </div>
`, note.Timestamp.Format("2006-01-02 15:04:05 MST"), note.Content)
	}

	htmlContent += `</body>
</html>`

	// Write to output file
	err = ioutil.WriteFile(outputFile, []byte(htmlContent), 0644)
	if err != nil {
		log.Fatalf("Error writing output file: %v", err)
	}

	fmt.Printf("Successfully combined %d notes into %s\n", len(notes), outputFile)
}
