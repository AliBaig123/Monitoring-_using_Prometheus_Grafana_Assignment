def call() {
    dir('backend') {
        sh 'mvn clean compile -DskipTests'
        echo "compiled successfully"
    }
}