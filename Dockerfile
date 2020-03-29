FROM  mcr.microsoft.com/dotnet/core/aspnet:3.0

WORKDIR /app

# Copy csproj and restore as distinct layers
COPY *.csproj ./
RUN dotnet restore

# Copy everything else and build
COPY . ./

# Install NodeJS 
RUN apt-get update
RUN apt-get -y install gnupg2
RUN curl -sL https://deb.nodesource.com/setup_10.x | bash -
RUN apt-get install -y nodejs

# Build out the frontend
RUN npm install
RUN npm run build-frontend

CMD ["dotnet watch run"]