# Times Table Visualization

Please see the [YouTube video by Mathologer](https://www.youtube.com/watch?v=qhbuKbxJsk8&t=112s)
about circular times table diagrams.

## For Developers

Simply `yarn` and then `yarn react-scripts-ts start` to have the app served
locally on `localhost:3000`.

## Deployment

Create a Netlify account -- you will need a netlify token. Optionally you can
point this to your own domain via the `site_name` variable or omit it. Then you
can deploy the app to Netlify with Terraform:

    terraform plan -var netlify_token=$TOKEN -var app_name=$APP_NAME -out times-tables.tfplan
    terraform apply times-tables.tfplan
