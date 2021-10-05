module Api
    module V1 
        class AirpostsController < ApplicationController
            # protect_from_forgery with: :null_session

            def index 
                airposts = Airpost.all

                render json: AirpostSerializer.new(airposts, options).serialized_json
            end

            def show 
                airpost = Airpost.find_by(slug: params[:slug])

                render json: AirpostSerializer.new(airpost, options).serialized_json
            end


            def create 
                airpost = Airpost.new(airpost_params)
                if airpost.save
                    render json: AirpostSerializer.new(airposts).serialized_json
                else
                    render json: {error: airpost.errors.messages }, status: 422
                end
            end

            def update
                airpost = Airpost.find_by(slug: params[:slug])
                
                if airpost.update(airpost_params)
                    render json: AirpostSerializer.new(airpost, options).serialized_json
                else
                    render json: {error: airpost.errors.messages }, status: 422
                end
            end

            def destroy 
                airpost = Airpost.find_by(slug: params[:slug])
                
                if airpost.destroy
                    head :no_content
                else
                    render json: {error: airpost.errors.messages }, status: 422
                end
            end


            private 

            def airpost_params
                params.require(:airpost).permit(:name, :image_url)
            end

            def options
                @options ||={include: %i[reviews]}
            end
        end
    end
end
