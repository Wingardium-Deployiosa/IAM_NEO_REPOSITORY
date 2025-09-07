#!/bin/bash

remove_java_comments() {
    local file="$1"
    sed -i '/^[[:space:]]*\/\//d' "$file"
    sed -i '/^[[:space:]]*\/\*/,/\*\//d' "$file"
    sed -i 's|//.*$||g' "$file"
    perl -i -pe 'BEGIN{undef $/;} s|/\*.*?\*/||sg' "$file"
}

remove_js_comments() {
    local file="$1"
    sed -i '/^[[:space:]]*\/\//d' "$file"
    sed -i '/^[[:space:]]*\/\*/,/\*\//d' "$file"
    sed -i 's|//.*$||g' "$file"
    perl -i -pe 'BEGIN{undef $/;} s|/\*.*?\*/||sg' "$file"
}

remove_css_comments() {
    local file="$1"
    perl -i -pe 'BEGIN{undef $/;} s|/\*.*?\*/||sg' "$file"
}

remove_html_comments() {
    local file="$1"
    perl -i -pe 'BEGIN{undef $/;} s|<!--.*?-->||sg' "$file"
}

remove_properties_comments() {
    local file="$1"
    sed -i '/^[[:space:]]*#/d' "$file"
    sed -i 's|#.*$||g' "$file"
}

remove_shell_comments() {
    local file="$1"
    sed -i '/^[[:space:]]*#/d' "$file"
    sed -i 's|#.*$||g' "$file"
}

find /home/coder/project/workspace -name "*.java" -type f | while read -r file; do
    echo "Removing comments from Java file: $file"
    remove_java_comments "$file"
done

find /home/coder/project/workspace -name "*.js" -type f | while read -r file; do
    echo "Removing comments from JavaScript file: $file"
    remove_js_comments "$file"
done

find /home/coder/project/workspace -name "*.css" -type f | while read -r file; do
    echo "Removing comments from CSS file: $file"
    remove_css_comments "$file"
done

find /home/coder/project/workspace -name "*.html" -type f | while read -r file; do
    echo "Removing comments from HTML file: $file"
    remove_html_comments "$file"
done

find /home/coder/project/workspace -name "*.properties" -type f | while read -r file; do
    echo "Removing comments from Properties file: $file"
    remove_properties_comments "$file"
done

find /home/coder/project/workspace -name "*.sh" -type f | while read -r file; do
    echo "Removing comments from Shell file: $file"
    remove_shell_comments "$file"
done

echo "Comment removal completed!"