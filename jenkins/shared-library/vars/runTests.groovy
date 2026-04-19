def call() {
    dir('backend') {
        sh 'mvn test'
        echo "Tests executed successfully"
    }
}