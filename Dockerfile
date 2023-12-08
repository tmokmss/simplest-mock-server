FROM public.ecr.aws/docker/library/node:20
COPY . .
RUN npm ci
CMD ["node", "index.js", "--port", "3000", "--status", "200", "--host", "0.0.0.0"]
