def call(String imageName, String tag) {
    dir('backend') {
        sh """
            docker build -t ${imageName}:${tag} .
            docker tag ${imageName}:${tag} ${imageName}:latest
        """
        echo "Docker image built: ${imageName}:${tag}"
    }
}