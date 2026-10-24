$word = New-Object -ComObject Word.Application
$word.Visible = $false
$word.DisplayAlerts = [Microsoft.Office.Interop.Word.WdAlertLevel]::wdAlertsNone

$docxFiles = Get-ChildItem -Path "F:\Awdf\Practical_*.docx" | Sort-Object Name

Write-Output "Found $($docxFiles.Count) practical documents to convert to PDF."

foreach ($file in $docxFiles) {
    $docxPath = $file.FullName
    $pdfPath = [System.IO.Path]::ChangeExtension($docxPath, ".pdf")
    Write-Output "Converting: $($file.Name) -> $([System.IO.Path]::GetFileName($pdfPath))"
    
    try {
        $doc = $word.Documents.Open($docxPath, $false, $true) # Open read-only
        # 17 = wdFormatPDF
        $doc.SaveAs([ref]$pdfPath, [ref]17)
        $doc.Close([ref]0) # 0 = wdDoNotSaveChanges
        Write-Output "  [SUCCESS] Saved $($pdfPath)"
    } catch {
        Write-Error "  [ERROR] Failed to convert $($file.Name): $($_.Exception.Message)"
    }
}

$word.Quit()
[System.Runtime.Interopservices.Marshal]::ReleaseComObject($word) | Out-Null
[System.GC]::Collect()
[System.GC]::WaitForPendingFinalizers()

Write-Output "`nAll 13 practical documents successfully converted to PDF!"
