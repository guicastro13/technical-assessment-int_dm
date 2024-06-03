$response = Invoke-WebRequest -Uri "http://localhost:3000/relatorio/generate?startDate=2024-4-17" -Method POST
$jsonContent = $response.Content | ConvertFrom-Json
$csvPath = $jsonContent.message
Invoke-WebRequest -Uri ("file:///" + $csvPath) -OutFile "downloaded_file.csv"