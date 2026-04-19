def call(String chartPath, String releaseName, String namespace, String imageName, String imageTag) {
    script {
        sh """
            kubectl create namespace ${namespace} --dry-run=client -o yaml | kubectl apply -f -
            helm upgrade --install ${releaseName} ${chartPath} \
                --namespace ${namespace} \
                --set image.repository=${imageName} \
                --set image.tag=${imageTag}
        """
        echo "Helm chart deployed: ${releaseName}"
    }
}